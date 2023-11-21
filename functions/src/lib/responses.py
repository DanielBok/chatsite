from typing import Any, Optional, Mapping

from fastapi import Response


class Ok(Response):
    def __init__(self,
                 content: Any = "Okay",
                 headers: Optional[Mapping[str, str]] = None):
        super().__init__(content=content, status_code=200, headers=headers)
