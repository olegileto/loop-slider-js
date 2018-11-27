const Hash = {
    items: [],
    getItems: function () {
        let items = this.items;
        let i = 0;

        $.getJSON("cart.json", (data) => {

            this.drawItems(data, items);

            $('#selectFilter ').on('change', () => {
                items = [];
                let newData = data;
                let i = 0;

                const optionValue = $("#selectFilter").find(":selected").val();
                if (optionValue !== 'all') {
                    newData = data.filter((i) => {
                        return i.category === optionValue;
                    });
                }

                this.drawItems(newData, items);
                this.clearItems();
                this.filterByItem(items, i);

            });
        }).done(() => {

            this.filterByItem(items, i);

            $("#nextArrow").on('click', () => {
                $('#app').html("");
                i++;
                if (i > items.length - 1) {
                    i = 0;
                }
                this.filterByItem(items, i);

            });
            $("#prevArrow").on('click', () => {
                $('#app').html("");
                i--;
                if (i === -1) {
                    i = items.length - 1;
                }

                this.filterByItem(items, i);

            });
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
    }
};

$(document).ready(function () {
    Hash.getItems()
});