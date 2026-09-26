DESK_MAP = {
    "Fee Verification & Billing": "Fee & Billing Desk",
    "Scholarship": "Scholarship Desk",
    "Refunds": "Refunds Desk",
}

def route_to_desk(category: str) -> str:
    return DESK_MAP.get(category, "General Desk")