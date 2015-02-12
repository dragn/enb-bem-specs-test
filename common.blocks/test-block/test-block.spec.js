modules.define('spec', ['i-bem__dom', 'BEMHTML', 'jquery'], function(provide, BEMDOM, BEMHTML, $) {

    describe('test-block', function() {

        it('should render content', function() {
            var block = BEMDOM.init($(BEMHTML.apply({ block : 'test-block' })).appendTo('body')).bem('test-block');

            block.domElem.text().should.equal('hello, world');
            BEMDOM.destruct(block.domElem);
        });

    });

    provide();
});
