// const fs = require("fs");
const path = require("path");
const { MDPoster } = require("../../md_poster/MDPoster");

describe("Unit test for MDPoster class", () => {
    const mockDir = path.resolve(__dirname, "mdposter_mock");

    beforeEach(async () => {
        this.mdPoster = new MDPoster(mockDir);

        await this.mdPoster.Posterization();
    });

    afterEach(() => {
        // fs.rmSync(path.resolve(mockDir, MDPoster.BUILD_DIR_NAME), {
        //     force : true,
        //     recursive : true
        // });
    });

    it("Test generate valid post meta", async () => {
        const postsMeta = this.mdPoster.postsMeta;

        expect(postsMeta).toHaveLength(3);
    });

    it("Test generate valid series", async () => {
        // const postsMeta = this.mdPoster.postsMeta;
        // const seriesMeta = this.mdPoster.seriesMeta;

        // expect(seriesMeta).toHaveLength(2);
    });

    it("Test generate valid tag", async () => {
        this.mdPoster.tagsMeta;
    });
});