const marked = require("marked");
const dayjs = require("dayjs");
const dayjsTimezone = require("dayjs/plugin/timezone");
const dayjsUTC = require("dayjs/plugin/utc");
const YAML = require("yaml");
const { MDNoMetadata } = require("./MDExceptions");

dayjs.extend(dayjsTimezone);
dayjs.extend(dayjsUTC);

/**
 * @class MDPostData
 * @type {Object}
 * @property {String} title
 * @property {String} content
 * @property {String} summary
 * @property {String} thumbnail
 * @property {String} date
 * @property {String} seriesName
 * @property {String[]} tags
 */
class MDPostData
{
    constructor()
    {
        this.title = "";
        this.content = "";
        this.summary = "";
        this.thumbnail = "";
        this.date = "";
        this.seriesName = "";
        this.tags = [];
    }
}

/**
 * Class parse markdown document.
 * It process parsing metadata and content in md document.
 * @class MDBuilder
 */
class MDBuilder 
{
    /**
     * @constructor
     * @public
     * @param {String} mdContent - markdown format document
     */
    constructor(mdContent = "")
    {
        this.mdContent = mdContent;

        // Set highlight.js
        marked.setOptions({
            highlight: function(code, lang) {
                const hljs = require("highlight.js");
                const language = hljs.getLanguage(lang) ? lang : "plaintext";

                return hljs.highlight(code, { language }).value;
            },
        })

        marked.use({
            extensions : [
                MDBuilder.GetMetadataExtension(),
            ]
        });
    }

    /**
     * Parse markdown docuemnt. It return MDPostData instance
     * @public
     * @param {String|null} [mdContent] - Markdown document for parsing
     * @returns {MDPostData}
     * @throws
     */
    Parse(mdContent = null)
    {
        if (mdContent)
        {
            this.mdContent = mdContent;
        }

        let postData = new MDPostData();

        const tokens = marked.lexer(this.mdContent);
        const renderedHTML = marked.parser(tokens);

        const metadataTokens = tokens.filter((token) => {
            if (token.type == "post_metadata")
            {
                return true;
            }
        });

        if (!metadataTokens.length)
        {
            throw new MDNoMetadata("No metadata in markdown document.");
        }

        const rawMetadata = metadataTokens[0].text;
        const parsedMetadata = YAML.parse(rawMetadata);

        if (!parsedMetadata.title)
        {
            throw new MDNoMetadata("Failed to find title metadata");
        }

        postData.title = parsedMetadata.title;
        postData.content = renderedHTML;
        postData.summary = parsedMetadata.summary ?? "";
        postData.thumbnail = parsedMetadata.thumbnail ?? "";
        postData.date = dayjs(parsedMetadata.date).tz(process.env.TZ).toISOString() ?? dayjs().tz(process.env.TZ).toISOString();
        postData.lastEditDate = parsedMetadata.lastEditDate ? ( 
                            dayjs(parsedMetadata.lastEditDate).tz(process.env.TZ).toISOString() ??
                            dayjs().tz(process.env.TZ).toISOString()
                        ) : undefined;
        postData.seriesName = parsedMetadata.series ?? "";
        postData.tags = parsedMetadata.tags ?? [];

        return postData;
    }

    /**
     * @static
     * Get Marked extension for parse metadata
     * @returns {Object}
     */
    static GetMetadataExtension()
    {
        return {
            name : "post_metadata",
            level : "block",
            start(src) {
                const match = src.match(/(^\[{3}[:\[{3}\n])(.*)(\]{3}[:\]{3}\n]?)/s);
                
                return match?.index;
            },
            tokenizer(src, tokens) {
                const rule = /(^\[{3}[:\[{3}\n])(.*)(\]{3}[:\]{3}\n]?)/s;
                const match = rule.exec(src);

                if (match)
                {
                    return {
                        type: "post_metadata",
                        raw: match[0],
                        text: match[2],
                    }
                }
            },
            renderer(token) {
                return "";
            }
        };
    }
}

module.exports = {
    MDPostData,
    MDBuilder,
};
