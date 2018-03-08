import GoRequest from '../../modules/GoRequest'

describe('GoRequest', () => {
    var gr = new GoRequest;
    beforeEach(function () {
        global.fetch = jest.fn().mockImplementation(() => {
            var p = new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    Id: '123',
                    json: function () {
                        return {Id: '123'}
                    }
                });
            });

            return p;
        });

    });

    it("should return a route object", async function () {
        const response = await gr.getRoutes('foo', 'bar');
        console.log(response);
        expect(response.Id).toBe('123');
    });
});