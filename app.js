      $$(document).on('page:init', '.page[data-name="kolejka"]', function(e) { 
        axios
            .get('http://localhost/cgi-bin/Kolejeczka.cgi')
            .then(response => {
                console.log(this.items, response.data);
                var virtualList = app.virtualList.create({
                    el: '.virtual-list',
                    items: response.data, 
                    searchAll: function(query, items) {
                        var found = [];
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].numer.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                        }
                        return found; 
                    },
                    itemTemplate: '<li>' +
                        '<a href="#" class="item-link item-content">' +
                        '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                        '<div class="item-title">{{numer}}</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>',
                    height: app.theme === 'ios' ? 63 : (app.theme === 'md' ? 73 : 46),
                });
            });
    });
