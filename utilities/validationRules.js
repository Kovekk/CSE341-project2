const {body, validationResult} = require('express-validator');

const playerValidationRules = () => {
    return [
        body('name')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),

        body('race')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),
        
        body('class')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),
        
        body('background')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),
        
        body('strength')
        .notEmpty()
        .escape()
        .trim()
        .isNumeric(),
        
        body('dexterity')
        .notEmpty()
        .escape()
        .trim()
        .isNumeric(),
        
        body('constitution')
        .notEmpty()
        .escape()
        .trim()
        .isNumeric(),
        
        body('wisdom')
        .notEmpty()
        .escape()
        .trim()
        .isNumeric(),
        
        body('intelligence')
        .notEmpty()
        .escape()
        .trim()
        .isNumeric(),
        
        body('charisma')
        .notEmpty()
        .escape()
        .trim()
        .isNumeric(),
        
        body('inspiration')
        .notEmpty()
        .escape()
        .trim()
        .isBoolean(),
        
        body('hp')
        .notEmpty()
        .escape()
        .trim()

    ]
}

const magicItemValidationRules = () => {
    return [
        body('name')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),
        body('type')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),
        body('rarity')
        .notEmpty()
        .escape()
        .trim()
        .isAlphanumeric('en-US', {ignore: ' -_'}),
        body('attunement')
        .notEmpty()
        .escape()
        .trim()
        .isBoolean()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    playerValidationRules,
    magicItemValidationRules,
    validate
}