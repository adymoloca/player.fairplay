export const handleDisabledStatusFormSubmit = (firstO, secondO, type, optionalParams) => {
    let result = false;
    Object.keys(firstO)?.forEach((key) => {
        if (!firstO[key] && !optionalParams?.includes(key)) {
            result = true;
        }
    });
    if (type === 'Edit' && firstO === secondO)
        result = true;
    return result;
} 