const app = new Vue({
    el: '#app',
    data: {
        numbers: [],
        game_numbers: [],
        table: {},
        moves: [],
        pivot: [],
        x: 4,
        y: 4
    },
    methods: {
        game(){
            this.numbers = [1, 2, 3, 4, 
                            5, 6, 7, 8, 
                            9, 10, 11, 12, 
                            13, 14, 15, ""]
            this.game_numbers = this.numbers.filter( () => true ).sort( () => Math.random() -0.5 );
            this.create_tab(this.game_numbers);
        },
        create_tab(array){
            let pos = 0;
            for(let i = 0; i < this.x; i++){
                this.table[i] = {};
                for(let j = 0; j < this.y; j++){
                    this.table[i][j] = {
                        val: array[pos],
                        near: [`${i+1}${j}`, `${i}${j+1}` ,`${i-1}${j}`, `${i}${j-1}`]
                    }
                    pos++;
                }
            }
            this.setMoves()
        },
        setMoves(){
            for(let i = 0; i < this.x; i++){
                for(let j = 0; j < this.y; j++){
                    if(!this.table[i][j].val){
                        this.moves = this.table[i][j].near
                        this.pivot = [i, j]
                    }
                }
            }
        },
        move(num){
            for(let i = 0; i < this.x; i++){
                for(let j = 0; j < this.y; j++){
                    if(this.table[i][j].val === num){
                        if(this.moves.includes(`${i}${j}`)){
                            this.table[i][j].val = "";
                            this.table[this.pivot[0]][this.pivot[1]].val = num;

                            let index = this.game_numbers.indexOf("");
                            this.game_numbers[this.game_numbers.indexOf(num)] = "";
                            this.game_numbers[index] = num;

                            this.moves = this.table[i][j].near;
                            this.pivot = [i, j];

                            this.game_numbers.push("a");
                            this.game_numbers.pop("a");

                            return
                        }
                    }
                }
            }
        }
    },
    computed: {

    },
    created: function(){
        this.game();
    }
})