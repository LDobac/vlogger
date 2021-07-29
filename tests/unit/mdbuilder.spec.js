const moment = require("moment");
const { MDBuilder, MDPostData } = require("../../md_poster/MDBuilder");

describe("Unit test for MDBuilder class", () => {
    beforeEach(() => {
        this.mdBuilder = new MDBuilder();
    });

    it("Test parsing metadata", () => {
        const mdOnlyMeta = "---\n" +
        `title:  "Chapter 2 : Application Layer"\n` +
        "date:   2021-04-13 22:06:43\n" +
        "series: Test Series\n" +
        `tags: ["tag1", "tag2", "tag3"]\n` +
        "---\n";

        const expectData = new MDPostData();
        expectData.title = "Chapter 2 : Application Layer";
        expectData.date = moment("2021-04-13 22:06:43").toISOString(true);
        expectData.seriesName = "Test Series";
        expectData.tags = ["tag1", "tag2", "tag3"];

        const postData = this.mdBuilder.Parse(mdOnlyMeta);

        expect(postData).toEqual(expectData);
    });
});