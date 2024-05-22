export default function sortedArticles(collections: any[]){
    return collections.sort((a, b)=> {
        const dateA = new Date(a.data.date).getTime();
        const dateB = new Date(b.data.date).getTime();
        return dateB - dateA
    });
}