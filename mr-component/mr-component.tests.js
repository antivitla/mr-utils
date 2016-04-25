describe ("Mr", function () {
	describe("match selector", function () {
		var t = $("<div class='zok zak'><a class='zok'></a><a class='zik'></a></div>").get(0);
		it("should match", function () {
			expect(mr.matchSelector(t, ".zok")).toEqual(true);
		});
		it("should unmatch", function () {
			expect(mr.matchSelector(t, ".zvek")).toEqual(false);
		});
	});
});