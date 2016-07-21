//Have created the string for channel header
//Need to loop through episodes and create string for episodes
//Lastly create footer and combine into one string

//Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//Models
var Channel = require('../models/channel');

//Routes
router.get('/', function (req, res, next) {
    res.render('generatefeed');
});

router.post('/', function(req, res, next){

    var channel = Channel.where({ title : req.body.channelTitle });

    channel.findOne(function(err, channel){
        if(channel){
            var feed = (createChannelHead(channel)) + (createEpisodeItems(channel)) + "</channel>\n</rss>";
            console.log(feed);
            res.render('index', { rssFeed : feed });
        }
    });
});

//Methods
function createChannelHead(channelObj){

    channelObj = {
        header: "<?xml version='1.0' encoding='utf-8'?>\n<rss version='2.0' xmlns:itunes='http://www.itunes.com/DTDs/Podcast-1.0.dtd' xmlns:media='http://search.yahoo.com/mrss/'>\n<channel>\n",
        footer: "</channel>\n</rss>",
        channelTitle: "<title>" + channelObj.title + "</title>\n",
        channelDescription: "<description>" + channelObj.description + "</description>\n",
        channelAuthor: "<author>" + channelObj.author + "</author>\n",
        channelWebsite: "<website>" + channelObj.website + "</website>\n",
        channelImg: "<itunes:image href='" + channelObj.image + "'/>\n",
        channelPubdate: "<pubDate>" + channelObj.created + "</pubDate>\n",
        channelLanguage: "<language>en-us</language>\n",
        channelCopyright: "<copyright>" + channelObj.copyright + "</copyright>\n\n"
    };

    //<pubDate> Sun, 09 Oct 2005 21:00:00 PST </pubDate>

    return (function(){
        returnString = channelObj.header + channelObj.channelTitle + channelObj.channelDescription + channelObj.channelAuthor + channelObj.channelWebsite + channelObj.channelImg + channelObj.channelPubdate + channelObj.channelLanguage + channelObj.channelCopyright;
        return returnString;
    })();

}

function createEpisodeItems(channelObj){
    episodes = channelObj.episodes;

    var epString = '';

    episodes.forEach(function(episode) {
        episode = {
            header: "<item>\n",
            epTitle : "<title>" + episode.title + "</title>\n",
            epDescription : "<description>" + episode.description + "</description>\n",
            epAuthor: "<itunes:author>" + episode.author + "</itunes:author>\n",
            epPubDate: "<pubDate>" + episode.pubDate + "</pubDate>\n",
            epFileUrl: "<enclosure url = '" + episode.fileUrl + "' length = '" + episode.fileSize  + "' type='audio/mpeg'/>\n",
            footer: "</item>\n\n"
        }
        epString = epString + episode.header + episode.epTitle + episode.epDescription + episode.epAuthor + episode.epPubDate + episode.epFileUrl + episode.footer;
    }, this);
    
    return epString;
}

/*
<channel>
<title>TTS Podcast</title>
<description>Our Podcast</description>
<itunes:author>TTS</itunes:author>
<link>takethisstudios.com</link>
<itunes:image href='you'/>
<pubDate>now</pubDate>
<language>undefined</language>
<copyright>Yup</copyright>

<item>
<title> This is just a test </title>
<description> A description of your podcast episode </description>
<itunes:author> Your Name </itunes:author>
<pubDate> Thu, 16 Jun 2005 5:00:00 PST </pubDate>
<enclosure url="http://www.yourserver.com/podcast_file.mp3" length="3174554" type="audio/mpeg" /> 
</item>

</channel>
</rss>
*/

/*
<?xml version='1.0' encoding='utf-8'?> 
<rss version='2.0' xmlns:itunes='http://www.itunes.com/DTDs/Podcast-1.0.dtd' xmlns:media='http://search.yahoo.com/mrss/'> 
<channel> 
<title>TTS Podcast</title> 
<description>We make a lot of things. Tech, Games, Comics, Nerd tings.</description> 
<author>Spencer Shoemaker</author> 
<website>http://www.takethisstudios.com</website> 
<itunes:image href='http://www.takethisstudios.com/fistlogo.png'/> 
<pubDate>undefined</pubDate> 
<language>en-us</language> 
<copyright>undefined</copyright> 

<item> 
<title>Zelda: Breath of the Wilds on the Timeline</title> 
<description>Where exactly does it place. Here what we think!</description> 
<itunes:author>Spencer Shoemaker and Joshua Shoemaker</itunes:author> 
<pubDate>Sun, 09 Oct 2005 21:00:00 PST</pubDate> 
<enclosure url = 'www.takethisstudios.com/podcasts/img/ZeldaBotW.png' length = 'undefined' type='audio/mpeg'/> 
</item> 

</channel> 
</rss>
*/
module.exports = router;