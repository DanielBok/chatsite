from typing import Optional, Any

from pydantic import BaseModel, PositiveInt, model_validator

from src.repository.kitchen.cookbook.models.base import BaseRecipe


class CreateRecipe(BaseRecipe):
    class Difficulty(BaseModel):
        level: PositiveInt
        max_level: PositiveInt

        @model_validator(mode='after')
        def validate(self):
            assert self.level <= self.max_level
            return self

    class Servings(BaseModel):
        min: PositiveInt
        max: PositiveInt
        units: str = 'servings'

    class Timings(BaseModel):
        class TimeRange(BaseModel):
            operation: str
            min: Optional[PositiveInt] = None
            max: Optional[PositiveInt] = None
            units: str = 'MINUTES'  # or "QUICK" for "PRESSURE RELEASE"
            prefix: Optional[str] = None
            suffix: Optional[str] = None

            @model_validator(mode='after')
            def validate(self):
                self.operation = self.operation.upper().strip()
                assert len(self.operation) > 0, "operation must not be empty"

                if isinstance((self.min, self.max), (int, int)) or (self.min is None and self.max is None):
                    raise TypeError("min and max must both be defined or undefined")

                return self

            @property
            def include_total(self):
                return self.operation != 'PRESSURE RELEASE'

        breakdown: list[TimeRange]

        @property
        def total(self):
            value = {'min': 0, 'max': 0, 'units': 'MINUTES'}
            for x in self.breakdown:
                if x.include_total and isinstance(x.min, int) and isinstance(x.max, int):
                    value['min'] += x.min
                    value['max'] += x.max

            return value

        def model_dump(self, **_kwargs) -> dict[str, Any]:
            return ({x.operation: x.model_dump(exclude={'operation'}) for x in self.breakdown} |
                    {'total': self.total})

    source: str = 'ninja'
    difficulty: Difficulty
    servings: Servings
    timings: Timings
    extra: Optional[dict[str, list[str]]] = None
    tips: Optional[str] = None
    image: Optional[str] = None

    def to_dict(self):
        return {
            'source': self.source,
            'name': self.name,
            'difficulty': self.difficulty.model_dump(),
            'servings': self.servings.model_dump(),
            'ingredients': [x.model_dump() for x in self.ingredients],
            'directions': self.directions,
            'timings': [x.model_dump() for x in self.ingredients],
            'extra': self.extra,
            'tips': self.tips,
            'image': self.image,
        }


class Recipe(CreateRecipe):
    _id: str

    def to_dict(self):
        return {'id': self._id} | super().to_dict()
