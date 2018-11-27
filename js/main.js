const Hash = {
    items: [],
    getItems: function () {
        let items = this.items;
        let i = 0;

        $.getJSON("js/cart.json", (data) => {

            this.drawItems(data, items);
            this.onChangeSelect(data, "#selectFilter")

        }).done(() => {

            this.filterByItem(items, i);
            this.drawArrows("#nextArrow", "#prevArrow", i)

        });
    },
    filterByItem: function (data, i) {
        $('#app').append(data[i]);
    },
    clearItems: function () {
        $('#app').html("");
    },
    drawItems: function (data, items) {
        $.each(data, (key, val) => {
            items.push(`<div id="${val.id}" class="${val.class}"> 
                                <img src="${val.image.imageURL}" title="${val.image.imageName}">
                                 <p>Title: ${val.title}</p> 
                                 <p>Category: ${val.category}</p> 
                                 <p>Description: ${val.description}</p> 
                        </div>`);
        });
    },
    drawArrows: function (next, prev, i) {
        $(next).on('click', () => {
            $('#app').html("");
            i++;
            if (i > this.items.length - 1) {
                i = 0;
            }
            this.filterByItem(this.items, i);

        });
        $(prev).on('click', () => {
            $('#app').html("");
            i--;
            if (i === -1) {
                i = this.items.length - 1;
            }

            this.filterByItem(this.items, i);

        });
    },
    onChangeSelect: function (data, select) {
        $(select).on('change', () => {
            this.items = [];
            let newData = data;
            let i = 0;

            const optionValue = $("#selectFilter").find(":selected").val();
            if (optionValue !== 'all') {
                newData = data.filter((i) => {
                    return i.category === optionValue;
                });
            }

            this.drawItems(newData, this.items);
            this.clearItems();
            this.filterByItem(this.items, i);
            this.drawArrows("#nextArrow", "#prevArrow", i)
        });
    }
};

$(document).ready(function () {
    Hash.getItems()
});