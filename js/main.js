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
        this.blockTemplate2 = $('#block-template-2').html();
        this.projectTemplate1 = $('#project-template-1').html();

        Mustache.parse(this.blockTemplate);
    }

    returnToProjects(){
        $("#projectDock").addClass("hidden");
        $("#projectDock").empty();
        $('#mygalleryContainer').removeClass("hidden1");

        // $('#justify-gallery').justifiedGallery().on('jg.complete', function (e) {
        //     $('.loading-animation').fadeOut();
        //     $(this).fadeIn();
        // });
    }

    selectProject(id) {
        var dock = $("#projectDock");
        $("#projectDock").empty();


        var categories = this.portfolio.structure.Projects;
        var projects = categories['stage'].projects;


        var subgaleryTemplate2 = $('#subgalery-template-2').html();
        Mustache.parse(subgaleryTemplate2);

        var projectKey = id;

        var project = projects[projectKey];
        var rendered = Mustache.render(subgaleryTemplate2, project);
        dock.append(rendered);

        this.renderGalery($("#"+project.id), [projectKey], project.height);
        
        $("#projectDock").removeClass("hidden");
        $('#mygalleryContainer').addClass("hidden1");

          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    renderPageByTag(tag) {
        return this.renderPageByTags([tag]);
    }

    renderPageByTags(tags) {
        if(tags[0]=="about"){

            if($("#mygalleryContainer").hasClass("hidden1")){
                this.returnToProjects();
            }
        }

        var dock = $("#mygallery");

        // clean old results
        dock.empty();
        dock.removeClass("justified-gallery");
        dock.css({"height": "auto"});


        if(tags[0]=="about"){

            var aboutTemplate = $('#about-template-1').html();
            Mustache.parse(aboutTemplate);
            var rendered = Mustache.render(aboutTemplate, {});
            dock.append(rendered);
            return;
        }

        var categories = this.portfolio.structure.Projects;

        if(tags[0] in categories){
            var projects = categories[tags[0]].projects;

            var page = categories[tags[0]];

            if(page.renderOutline === undefined || page.renderOutline === true){

                var ul = document.createElement("ul");
                var h = document.createElement("h1");
                $(h).text(categories[tags[0]].title);
                for(var projectKey in projects) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.href="#anchor-subgalery-"+projectKey
                    $(a).html(projects[projectKey].title);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                dock.append(h);
                dock.append(ul);
            }

            if(page.style === undefined || page.style === "structure")
            {
                var subgaleryTemplate = $('#subgalery-template-1').html();
                Mustache.parse(subgaleryTemplate);

                for(var projectKey in projects) {
                    var project = projects[projectKey];
                    var rendered = Mustache.render(subgaleryTemplate, project);
                    dock.append(rendered);
                    this.renderGalery($("#"+project.id), [projectKey], project.height);
                };
            }
            else if(page.style === "tiles")
            {
                var projectDock = $("#projectDock");

                // TODO: finish this
                this.renderProjectGalery(dock, ["face"], 300, tags[0]);

                $("#mygallery > .jg-entry > img").prop("onclick", null).off("click");

                // for(var projectKey in projects) {
                //     var project = projects[projectKey];
                //     var rendered = Mustache.render(subgaleryTemplate2, project);
                //     projectDock.append(rendered);
                //     this.renderGalery($("#"+project.id), [projectKey], project.height);
                // };
            }

        }
        else {
            this.renderGalery(dock, tags, 300);
        }
    }

    renderStageProjectPage(dock, projectName){
        Structure.Projects["stage"].projects[projectName].title
    }


    renderProjectGalery(dock, tags, chosenHeight, page) {
        var images;
        if (tags[0] == "all")
            images = this.portfolio.structure.Images;
        else
            images = this.portfolio.selectImagesByTags(tags);

        var pr = this;

        var index = 0;

        images.forEach(function (image) {

            console.log(image);
            var rendered = Mustache.render(pr.blockTemplate2,
                {
                    url: Settings.imagePath + image.file,
                    tmbUrl: Settings.imagePath + "tbn/" + image.file,
                    description: image.description,
                    tags: image.tags,
                    col: image.col,
                    projectId: image.tags[1],
                    ind: index,
                    title: Structure.Projects[page].projects[image.tags[1]].title,
                    shortDescription: Structure.Projects[page].projects[image.tags[1]].shortDescription,
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
            margins: 10,
            waitThumbnailsLoad: false
        };

        dock.justifiedGallery(justifiedGaleryOptions);

        var pswpElement = document.querySelectorAll('.pswp')[0];


// build items array

        var items = images.map(function (image) {
            return {
                src: Settings.imagePath + image.file,
                w: image.w !== undefined ? image.w : 500,
                h: image.h !== undefined ? image.h : 500,
                title: image.description
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

    renderGalery(dock, tags, chosenHeight, style="default") {
        var images;
        if (tags[0] == "all")
            images = this.portfolio.structure.Images;
        else
            images = this.portfolio.selectImagesByTags(tags);

        var pr = this;

        var index = 0;

        images.forEach(function (image) {

            if(style === "default"){
                var rendered = Mustache.render(pr.blockTemplate,
                    {
                        url: Settings.imagePath + image.file,
                        tmbUrl: Settings.imagePath + "tbn/" + image.file,
                        description: image.description,
                        tags: image.tags,
                        col: image.col,
                        ind: index
                    });
            }

            if(style === "face"){
                console.log(image);
                var rendered = Mustache.render(pr.blockTemplate2,
                    {
                        url: Settings.imagePath + image.file,
                        tmbUrl: Settings.imagePath + "tbn/" + image.file,
                        description: image.description,
                        tags: image.tags,
                        col: image.col,
                        ind: index,
                        title: Structure.Projects[image.tags[0]].title,
                        shortDescription: Structure.Projects[image.tags[0]].shortDescription,
                    });
            }

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
            margins: 10,
            waitThumbnailsLoad: false
        };

        dock.justifiedGallery(justifiedGaleryOptions);

        var pswpElement = document.querySelectorAll('.pswp')[0];


// build items array

        var items = images.map(function (image) {
            return {
                src: Settings.imagePath + image.file,
                w: image.w !== undefined ? image.w : 500,
                h: image.h !== undefined ? image.h : 500,
                title: image.description
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
