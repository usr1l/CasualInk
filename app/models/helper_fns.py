def normalize_data(items):
    if not isinstance(items, list):
        raise ValueError("Must be an array to normalize")

    normalized_data = {}

    for item in items:
        normalized_data[item.id] = item

    return normalized_data
