let app = new Vue({
  el: '#app',   //dom element that vue is managing
  data: {
	bookEntered: '',
	booknum: '',
	booktoAd: {}, 
	allBooks: [],
	loading: false,
	addedName: '',
	  
  addedComment: '',
  favoiteBooks: [],
  },
  methods: {
    async findBooks() {
			try {
				this.loading = true;
				const bookString = this.bookEntered.split(' ').join('+');

				const json = await axios.get('https://openlibrary.org/search.json?q=' + bookString);
				for (let i = 0; i < json.data.docs.length; i++) {
				console.log(i);
				var curDate = "";
				var curAuth = "";
				var curIS = "";
				if(json.data.docs[i].hasOwnProperty('publish_date')) {
					curDate = json.data.docs[i].publish_date[0];
				}
				if (json.data.docs[i].hasOwnProperty( 'author_name')) {
					curAuth =  "Written by: " + json.data.docs[i].author_name[0];
				}
				if (json.data.docs[i].hasOwnProperty('isbn') ) {
					curIS = json.data.docs[i].isbn[0];
					const response = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + curIS + '&jscmd=details&format=json');
					if (response.data['ISBN:'+ curIS].hasOwnProperty('thumbnail_url')) {
						curIS = response.data['ISBN:'+ curIS].thumbnail_url;
					}
					else {
						curIS = "https://i.pinimg.com/originals/b5/48/c4/b548c4b1da24ac7ec74785b4e4581d7f.jpg";
					}
				} else {
					curIS = "https://i.pinimg.com/originals/b5/48/c4/b548c4b1da24ac7ec74785b4e4581d7f.jpg";
				}
				this.allBooks.push({
					title: json.data.docs[i].title_suggest,
					publishDate: curDate,
					author: curAuth,
					url: curIS,
					place: i,
					favorite: false
				})
				}
				this.loading = false;
			} catch (error) {
			console.log(error);
			}
		},
		searchBook() {
			this.allBooks = [];
			this.findBooks();
		},  
		addBooktoFav(bookIndex) {
			this.allBooks[bookIndex].favorite = true;
			this.favoiteBooks.push(this.allBooks[bookIndex]);
		},
		deleteItem(book) {
      var index = this.favoiteBooks.indexOf(book);
      if (index > -1)
        this.favoiteBooks.splice(index,1);
    },
  },
    computed: {
		
  },
    watch: { 
		favoiteBooks() {
			document.getElementById("seefavs").style.display = "block";
		}
  },
});