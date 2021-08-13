export class EncuestaData 
{
    private Posicion: number[] = [1,2,3,4];
    private valores:number[] = [0,0,0,0];

    constructor(){}

    getDataEncuesta()
    {
        return [
          {data:this.valores,label:'Encuesta'}  
        ]
    }
    incremetarValor(pos:number,valor:number)
    {       
        for (let i in this.Posicion) {
            
            if(this.Posicion[i] === pos)
            {
                this.valores[i] += valor;
            }            
        }
        return this.getDataEncuesta();
    }
}