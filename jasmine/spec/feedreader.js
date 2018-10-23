/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); //check if feed.url is defined.
                expect(feed.url.length).not.toBe(0); //check feed.url length is > 0
            }

        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {

            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); //check if feed.name is defined.
                expect(feed.name.length).not.toBe(0); //check feed.name length is > 0
            }

        });
    });


    /* A new test suite named "The menu" */
    describe('The Menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        const body = document.querySelector('body'); //select the body tag
        const menu = document.querySelector('.menu-icon-link'); //select the menu icon by class name

        it('is hidden', function() {

            expect(body.classList.contains('menu-hidden')).toBe(true); //check if menu is truly hidden

        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles on and off', function() {

            menu.click(); //load menu on pageload; as clicked
            expect(body.classList.contains('menu-hidden')).toBe(false); //check if menu is not hidden

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true); //check if menu is hidden

        });

    });


    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /*  A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done); //call loadFeed() for the 1st index
            done();
        });

        //confirm feedcontainer is not empty with at least 1 element
        it('has at least one entry', function() {


            let entry = $('.feed').children('.entry'); // select class

            expect(entry.length).not.toEqual('0'); //check class not to be equal to empty string
        });


    });

    /*A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //undefined variables for feeds
        let feedOne;
        let feedTwo;

           beforeEach(function(done) {

                loadFeed(0, function() {
                    feedOne = $('.feed')[0].innerText;

                    loadFeed(1, function() {
                        feedTwo = $('.feed')[0].innerText;

                        done(); // call done when variables are fed and tests can begin
                    });
                });
            });

        //change array content on load 
        it('changes content when new feed loads', function(done) {
            expect(feedOne).not.toEqual(feedTwo);

            done();
        });

    });



}());
