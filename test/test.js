var expect = chai.expect;

describe('Split equality', function () {
    it('should return an Arrary of numbers and operators', function () {
        assert(isAllEqual(['49', '+', '3'], splitInput("49+3"), "abc"));
        assert(isAllEqual(['51', '+', '(', '31', '*', '22', '-', '1', ')', '*', '22'], splitInput("51+(31*22-1)*22"), "abc"));
        assert(isAllEqual(['21', '/', '3', '+', '99.3122', '*', '331', '/', '(', '21', '-', '1', ')'], splitInput("21/3+99.3122*331/(21-1)"), "abc"));
    }) 
});

describe('Calculate equality', function () {
    describe('Single:+', function () {
        it('should return right result', function () {
            expect(2).to.be.equal(expression(splitInput("1+1")));
            expect(74).to.be.equal(expression(splitInput("23+51")));
            expect(40.112).to.be.equal(expression(splitInput("32.112+8")));//32.112+8.904 = 41.016
        });
    });

    describe('Single:-', function () {
        it('should return right result', function () {
            expect(42).to.be.equal(expression(splitInput("45-3"))); // 45-3 = 42
            expect(-67.234).to.be.equal(expression(splitInput("32-99.234"))); // 32-99.234 = -67.234
        });
    });

    describe('Single:*', function () {
        it('should return right result', function () {
            expect(66).to.be.equal(expression(splitInput("2*33"))); // 2*33 = 66
            expect(47.976).to.be.equal(expression(splitInput("23.988*2"))); // 23.988*2 = 47.976
        });
    });

    describe('Single:/', function () {
        it('should return right result', function () {
            expect(16).to.be.equal(expression(splitInput("32/2"))); // 32/2 = 16
            expect(9.044).to.be.equal(expression(splitInput("45.22/5"))); // 45.22/5 = 9.044
        });
    });

    describe('Mix:', function () {
        it('should return right result', function () {
            expect(4).to.be.equal(expression(splitInput("(1+1)*2"))); // (1+1)*2 = 4
            expect(-47.94).to.be.equal(expression(splitInput("(23-21)*2.03-(54-2)"))); // (23-21)*2.03-(54-2) = -47.94
            expect(372.223).to.be.equal(expression(splitInput("(99-8)*3.1+90.123"))); // (99-8)*3.1+90.123 = 119.47783870967743
            expect(-358.099).to.be.equal(expression(splitInput("2-(21+99.033)*3"))); // 2-(21+99.033)*3 = -358.099
        });
    });
});