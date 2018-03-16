import GoRequest from '../../modules/GoRequest'

describe('GoRequest', () => {
    let gr = new GoRequest;
    beforeEach(function () {
        global.fetch = jest.fn().mockImplementation(cb => {
            let p = new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    Id: '123',
                    json: function () {
                        return {
                            "points": [
                                {
                                    "pos": 1,
                                    "point": {
                                        "lat": 53.3415881,
                                        "lng": -6.2862943
                                    }
                                },
                                {
                                    "pos": 2,
                                    "point": {
                                        "lat": 53.3415859,
                                        "lng": -6.286226399999999
                                    }
                                },
                                {
                                    "pos": 3,
                                    "point": {
                                        "lat": 53.3415167,
                                        "lng": -6.2839095
                                    }
                                }
                            ]
                        }
                    }
                });
            });
            return p;
        });

    });

    it("should return a route object", async (done) => {
        callback = (route) => {
            expect(route).toEqual([
                {
                    latitude: 53.3415881,
                    longitude: -6.2862943
                },
                {
                    latitude: 53.3415859,
                    longitude: -6.286226399999999
                },
                {
                    latitude: 53.3415167,
                    longitude: -6.2839095
                }
            ]);
            done();
        };

        await gr.getRoutes('foo', 'bar', 'foo', 'bar', callback);
    });
});