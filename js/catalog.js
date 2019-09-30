var productsCatalog = [
	{id: 'el1', name: 'nm1', price: 1111, img: 'https://image.shutterstock.com/image-vector/wf-logo-600w-604168505.jpg'},
	{id: 'el2', name: 'nm2', price: 2222, img: 'https://image.shutterstock.com/image-vector/wf-logo-600w-604168505.jpg'},
	{id: 'el3', name: 'nm3', price: 3333, img: 'https://image.shutterstock.com/image-vector/wf-logo-600w-604168505.jpg'},
	{id: 'el4', name: 'nm4', price: 4444, img: 'https://image.shutterstock.com/image-vector/wf-logo-600w-604168505.jpg'},
	{id: 'el5', name: 'nm5', price: 5555, img: 'https://image.shutterstock.com/image-vector/wf-logo-600w-604168505.jpg'}
];



class ServiceProducts{
	constructor(containerProducts, containerCounter, productsCatalog){
		this.container = document.querySelector(containerProducts);
		this.containerCounter = document.querySelector(containerCounter);
		this.productsCatalog = productsCatalog;
		this.create();
	}



	create(){

		var products = serviceStore.getProducts();
		this.containerCounter.innerText = products.length;

		for(var i = 0; i < productsCatalog.length; i++){
			
			var index = products.indexOf(this.productsCatalog[i].id);
			if (index === -1){
				var activeClass = '';
				var acttiveText = 'Buy';
			}else {
				var activeClass = ' btn-active';
				var  acttiveText = 'Delete';
				
			}

			var item = serviceCreateElement.getElement({ tagName: 'div', className: 'item'});
			var name = serviceCreateElement.getElement({ tagName: 'div', className: 'name', innerText: this.productsCatalog[i].name});
			var img =  serviceCreateElement.getElement({ tagName: 'div', className: 'img', backgroundImage: `url(${this.productsCatalog[i].img})`});
			var price = serviceCreateElement.getElement({ tagName: 'div', className: 'price', innerText: this.productsCatalog[i].price.toLocaleString()+' USD'});
			var btn = serviceCreateElement.getElement({ tagName: 'button', className: 'btn' + activeClass, innerText: acttiveText, id:this.productsCatalog[i].id });
			
			btn.addEventListener('click', function(){	
				var id = this.getAttribute('data-id');
				var result = serviceStore.putProduct(id);

				serviceProducts.containerCounter.innerText = result.products.length;

				if(result.pushProduct){
					this.classList.add('btn-active');
					this.innerText = 'Delete';
				}else {
					this.classList.remove('btn-active');
					this.innerText = 'Buy';
				}
			});

			this.container.appendChild(item);  
			item.appendChild(name);
			item.appendChild(img);
			item.appendChild(price);
			item.appendChild(btn);

		}
		
	}



	actions(){
		// 
	}
}

var serviceProducts = new ServiceProducts('.container-products', '.container-counter', productsCatalog);

