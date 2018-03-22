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
                            "RouteID": 4,
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

    it("should return a route object with a points property", async (done) => {
        callback = (route) => {
            expect(route).toHaveProperty('points');
            done();
        };

        await gr.getRoutes('foo', 'bar', 'foo', 'bar', callback);
    });

    it("should return a route object with a RouteID property", async (done) => {
        callback = (route) => {
            expect(route).toHaveProperty('RouteID');
            done();
        };

        await gr.getRoutes('foo', 'bar', 'foo', 'bar', callback);
    });

    it("should match the expected result", async (done) => {

        callback = (route) => {
            try {
                expect(route).toEqual({
                    RouteID: 4,
                    points: [
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
                    ]
                });
                done();
            } catch (err){
                done.fail(err);
            }
        };

        await gr.getRoutes('foo', 'bar', 'foo', 'bar', callback);
    })
});