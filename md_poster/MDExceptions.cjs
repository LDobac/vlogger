class MDNoMetadata extends Error
{
    constructor(message = "", ...params)
    {
        super(...params);

        if (Error.captureStackTrace)
        {
            Error.captureStackTrace(this, MDNoMetadata);
        }

        this.name = "MDNoMetadata";
        this.message = message;
    }
}

class MDNotValidData extends Error
{
    constructor(message = "", ...params)
    {
        super(...params);

        if (Error.captureStackTrace)
        {
            Error.captureStackTrace(this, MDNoMetadata);
        }

        this.name = "MDNotValidData";
        this.message = message;
    }
}

module.exports = {
    MDNoMetadata,
    MDNotValidData
}