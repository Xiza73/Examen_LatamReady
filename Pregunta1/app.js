const app = new Vue({
    el: '#app',
    data: {
        h1: 'pregunta 1',
        title: "",
        date_start: "",
        date_end: "",
        description: "",
        state: $('input[type=radio]:checked').val(),
        events: [],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
                    "Setiembre", "Octubre", "Noviembre", "Diciembre"],
        month_selected: "",
        events_filtered: [],
        events_prox: []
        /*
        evento: {
            title: string,
            date_start: date,
            date_end: date,
            description: string,
            state: string
        }
        */
    },
    methods: {
        save(){
            //Guardar en el localStorage
            localStorage.setItem('events', JSON.stringify(this.events))
        },
        create(){
            event.preventDefault();

            if(this.title && this.date_start && this.date_end && this.description){
                if(this.date_end > this.date_start){
                    this.events.push({
                        title: this.title,
                        date_start: this.date_start,
                        date_end: this.date_end,
                        description: this.description,
                        state: $('input[type=radio]:checked').val(),
                    });
                    this.orderEvents();
                    this.eventsProx();
                    this.save();
                    location.reload()
                }else{
                    console.log("la fecha de fin debe ser posterior a la fecha de inicio")
                }
            }else{
                console.log("faltan datos");
            }
        },
        orderEvents(){
            this.events.sort(function(a, b){
                if(a.date_start < b.date_start){
                    return -1;
                }else if (a.date_start > b.date_start){
                    return 1;
                }else {
                    return 0;
                }
            })
        },
        eventsFilter(){
            this.events_filtered = this.events.filter(e => 
                new Date(e.date_start).getMonth() === this.months.indexOf(this.month_selected)
            )
        },
        eventsProx(){
            this.events_prox = this.events.filter(e => 
                new Date() <= new Date(e.date_start)   
            ).filter((e, i) => i < 5)
            console.log(this.events)
            console.log(this.events.filter(e => 
                new Date() <= new Date(e.date_start)   
            ))
            console.log(this.events_prox);
        },
        myHash(string){
            var hash = 0, i, chr;
            if (string.length === 0) return hash;
            for (i = 0; i < string.length; i++) {
              chr   = string.charCodeAt(i);
              hash  = ((hash << 5) - hash) + chr;
              hash |= 0;
            }
            console.log(`${string.charAt(1)}${hash.toString()}`)
            return string.charAt(1) + hash.toString();
        }
    },
    computed: {

    },
    created: function(){
        //inicia el localStorage
        if(JSON.parse(localStorage.getItem('events'))){
            this.events = JSON.parse(localStorage.getItem('events'));
            this.orderEvents();
            this.eventsProx();
        }
    }
})