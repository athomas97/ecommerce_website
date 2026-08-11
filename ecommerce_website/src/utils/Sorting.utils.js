export function sort(sort_method, products) {
    let newList = []
    switch (sort_method) {
        case 'price_low_to_high':
            return sortLowestToHighestPrice(products);
        case 'price_high_to_low':
            return sortHighestToLowestPrice(products);
        case 'newest':
            return sortNewest(products);
        case 'oldest':
            return sortOldest(products);
        default:
            return products
    }
}

function sortLowestToHighestPrice(products) {
    return [...products].sort(function(a,b) {
        return Number(a.cost) - Number(b.cost)
    });
}

function sortHighestToLowestPrice(products) {
    return [...products].sort(function(a,b) {
        return Number(b.cost) - Number(a.cost)
    });
}

function sortNewest(products) {
    return [...products].sort(function(a,b) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    });
}

function sortOldest(products) {
    return [...products].sort(function(a,b) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    });
}