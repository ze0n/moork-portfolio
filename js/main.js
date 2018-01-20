// global Structure
// Structure.tags
// Structure.Projects
// Structure.Images

var Settings = {
    imagePath: "img/"
};

class Portfolio {
    extractAllTags(structure) {
        var ret = {};
        structure.Images.forEach(function (d) {
            d.tags.forEach(function (a) {
                if (ret[a] == undefined)
                    ret[a] = 0;
                ret[a]++;
            });
        });
        return ret;
    }

    makeTagHash(structure) {
        var ret = {};
        structure.Images.forEach(function (image) {
            image.tags.forEach(function (a) {
                if (ret[a] == undefined)
                    ret[a] = [];
                ret[a].push(image);
            });
        });
        return ret;
    }

    constructor(structure) {
        this.structure = structure;
        this.AllTags = this.extractAllTags(structure);

        console.log(this.AllTags);

        this.tagHash = this.makeTagHash(structure);
        this.cachedSelects = {};
    }

    selectImagesByTag(tag) {
        return this.selectImagesByTags([tag]);
    }

    selectImagesByTags(tags) {
        if (this.cachedSelects[tags] != undefined)
            return this.cachedSelects[tags];

        var ret = [];
        this.structure.Images.forEach(function (image) {
            var condition = true;
            tags.forEach(function (tag) {
                condition = condition && (image.tags.indexOf(tag) > -1);
            });

            if (condition)
                ret.push(image);
        });

        this.cachedSelects[tags] = ret;
        return ret;
    }
}


class PortfolioRenderer {
    constructor(portfolio) {
        this.portfolio = portfolio;

        this.blockTemplate = $('#block-template-1').html();
        Mustache.parse(this.blockTemplate);
    }

    renderPageByTag(tag) {
        return this.renderPageByTags([tag]);
    }

    renderPageByTags(tags) {
        var dock = $("#mygallery");

        // clean old results
        dock.empty();
        dock.removeClass("justified-gallery");
        dock.css({"height": "auto"});

        if(tags[0] == "stage"){

            var subgaleryTemplate = $('#subgalery-template-1').html();
            Mustache.parse(subgaleryTemplate);

            var rendered;

            rendered = Mustache.render(subgaleryTemplate,
                {
                    id: "subgalery-afisha",
                    title: "Afishes"
                }
            );
            dock.append(rendered);
            this.renderGalery($("#subgalery-afisha"), ["afisha"], 300);

            rendered = Mustache.render(subgaleryTemplate,
                {
                    id: "subgalery-scenography",
                    title: "Scenography"
                }
            );
            dock.append(rendered);
            this.renderGalery($("#subgalery-scenography"), ["scenography"], 200);

            rendered = Mustache.render(subgaleryTemplate,
                {
                    id: "subgalery-costumes",
                    title: "Costumes"
                }
            );
            dock.append(rendered);
            this.renderGalery($("#subgalery-costumes"), ["costumes"], 200);

        } else {
            this.renderGalery(dock, tags, 300);
        }
    }

    renderGalery(dock, tags, chosenHeight) {
        var images;
        if (tags[0] == "all")
            images = this.portfolio.structure.Images;
        else
            images = this.portfolio.selectImagesByTags(tags);

        var pr = this;

        var index = 0;

        images.forEach(function (image) {
            var rendered = Mustache.render(pr.blockTemplate,
                {
                    url: Settings.imagePath + image.file,
                    tmbUrl: Settings.imagePath + "tbn/" + image.file,
                    description: image.description,
                    tags: image.tags,
                    col: image.col,
                    ind: index
                });
            index += 1;
            dock.append(rendered);
        });

        // var chosenHeight = 300;
        // if (tags[0] == "stage" || tags[0] == "costumes" || tags[0] == "afisha" || tags[0] == "scenography" ){
        //     chosenHeight = 200;
        // }

        var justifiedGaleryOptions = {
            rowHeight: chosenHeight,
            lastRow: 'nojustify',
            maxRowHeight: 350,
            margins: 10
        };

        dock.justifiedGallery(justifiedGaleryOptions);

        var pswpElement = document.querySelectorAll('.pswp')[0];


// build items array

        var items = images.map(function (image) {
            return {
                src: Settings.imagePath + image.file,
                w: image.w !== undefined ? image.w : 500,
                h: image.h !== undefined ? image.h : 500
            }
        });

        $(dock).find(".zoomable-image").click(function(a) {
            // define options (if needed)
            var options = {
                // optionName: 'option value'
                // for example:
                index: parseInt(a.target.dataset.index) // start at first slide
            };

            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
            var pind = parseInt(a.target.dataset.index,10); 
            gallery.goTo(pind);
        });

    }

}

var P = new Portfolio(Structure);
var PR = new PortfolioRenderer(P);
PR.renderPageByTag("someTag");

window.PR = PR;

var SelectTag = function (tag) {
    PR.renderPageByTag(tag);
};


