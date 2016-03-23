// smart voter notes
var request = require ('request');

request('https://www.yelp.com/biz/the-flying-falafel-san-francisco-3?start=20',
 function (err, resp, body) {
  console.log(body);
});



/*
1 ) OUR TRAITS: 
var traitNames = ['Good Food', 'Good Drinks', 'Good Deal', 'Not Noisy', 'Not Crowded', 'No Wait','Good Service','Upscale', 'Veggie Friendly'];
var traitSensitivities = [false, false, false, true, true, true, true, false, false];

// WE SHOULD CONSIDER adding cleanlinesss.... 



YELP REVIEW CRAWLER RESEARCH: 

https://www.yelp.com/biz/the-flying-falafel-san-francisco-3

"the-flying-falafel-san-francisco-3"

is the yelpId in our db

so the path for the first page is
https://www.yelp.com/biz/[yelpId] 

then
https://www.yelp.com/biz/the-flying-falafel-san-francisco-3?start=20
(for the second set of 20 reviews)

https://www.yelp.com/biz/the-flying-falafel-san-francisco-3?start=40
etc etc 


1) request the pages for the given establishment
2) run cheerio parser on them - 
    - find all <p itemprop="description" lang="en"> (this will be a single review) </p>
3) add to mongo db 

  
*/

