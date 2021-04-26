const app = new Vue({
    el: '#app',
    data: {
        h1: 'pregunta 2',
        api_data: [],
        /*
        data: {
            name: string,
            country: string
        }
        */
        country_selected: "United States",
        univ_selected: "",
        button_univ: 0,
        loading: "Loading..."
    },
    methods: {
        async getData(){
            const response = await fetch('http://universities.hipolabs.com/search')
            this.api_data = await response.json();
        },
        countryFilter(){
            this.univ_selected = "";
            this.button_univ = 0;
        },
        univFilter(){
            this.country_selected = "";
            this.button_univ = 1;
        },
        elements(){
            if(this.country_selected){
                return this.api_data.filter(e => 
                    this.country_selected === e.country
                );
            }
            if(this.univ_selected && this.button_univ){
                return this.api_data.filter(e => 
                    this.univ_selected === e.name
                );
            }
            return this.api_data
        },
        countries(){
            return [... new Set(this.api_data.map(e => e.country))]
        },
        graphic(){
            const process_data = {};
            const cant = [];
            const ctx = document.getElementById('myChart').getContext('2d');

            for(c of this.countries()){
                process_data[c] = 0;
            }
            for(a of this.api_data.map(e => e.country)){
                process_data[a]++;
            }
            for(c of this.countries()){
                cant.push(process_data[c]);
            }

            const myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.countries(),
                    datasets: [{
                        label: "Universidades por país",
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        data: cant
                    }]
                }
            });            
        }
    },
    computed: {

    },
    created: async function(){
        try {
            const response = await fetch('http://universities.hipolabs.com/search')
            this.api_data = await response.json();
            this.loading = "";
            this.graphic();
        }catch(error){
            console.log(error);
        }
    }
})