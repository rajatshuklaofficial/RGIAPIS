
exports.getLocalisedMessage = (dict, language_code = 'en') => {
    if (dict && dict[language_code]) {
        return dict[language_code]
    } else {
        return ""
    }
}