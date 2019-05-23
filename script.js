let app = new Vue({
  el: '#app',   //dom element that vue is managing
  data: {
	bookEntered: '',
	currentISBN: '',
	booknum: '',
	allBooks: {},
	loading: false,
	addedName: '',
	  
    addedComment: '',
    favoiteBooks: {},
  },
  methods: {
    async findBooks() {
	  try {
		this.loading = true;
		const bookString = this.bookEntered.replace(/ /g,"+");
        const json = await axios.get('http://openlibrary.org/search.json?q=' + bookString);
		for (let i=0; i < json.data.docs.length; i++) {
			Vue.set(app.allBooks, this.i, new Array);
			this.allBooks[this.i].push({
					title: json.data.docs[i].title_suggest,
					//publishDate: json.data.docs[i].
					})
			/*
			if(json.data.docs[i].hasOwnProperty( 'isbn')){
				
				this.currentISBN = json.data.docs[i].isbn[0];
				const response = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.currentISBN + '&jscmd=details&format=json');
				const thePath = "ISBN:" + this.currentISBN;
				Vue.set(app.allBooks, this.i, new Array);
				this.allBooks[this.i].push({
					title: response.data.thePath.details.title,
					publishDate: response.publish_date,
					img: response.preview_url
					})
				  this.currentISBN=0;
			}*/
		}
		this.loading = false;
	  } catch (error) {
		console.log(error);
	  }
	},
	searchBook() {
		this.findBooks();
  }  
  },
    computed: {
		
  },
    watch: {  // will make so changing the number does something
  },
});