module.exports=function Cart(oldCart){
    //fetch
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;

    this.add=function(item,id){

        var storedItem=this.items[id];
        if(!storedItem){
            storedItem=this.items[id]={ item: item, qty: 0, pret: 0 };
        }

    storedItem.qty++;
    storedItem.pret = storedItem.item.pret * storedItem.qty; 
    this.totalQty++;
    this.totalPrice += storedItem.item.pret;

    };

    this.delete=function(id){
    
        this.totalPrice -=this.items[id].pret * this.items[id].qty;
        delete this.items[id];
    }


    this.itemArray=function(){
        var array=[];
        for(var id in this.items){
            array.push(this.items[id]);
        }

        return array;

    };

};