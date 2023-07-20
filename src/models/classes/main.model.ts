import { consultasGenerales } from "../../consultas/consultasGenerales";

export class PaginaPrincipal{


    async TotalPacientes(){

       const totalPacientes = await consultasGenerales(`SELECT COUNT(id_paciente) AS "paciente" FROM pacientes`);
       return totalPacientes[0];

    }
    async cantidadGeneros(genero:string){

        const [result]:any = await consultasGenerales(`SELECT count(identidad_genero) AS "generos" FROM historias_identidades_generos
        WHERE identidad_genero = ?`, [genero]);
        
         return result.generos;

    }
    async ingresosDelDia(){

        const query = `SELECT count(id_ficha_tecnica) as ingresosDia FROM fichas_tecnicas WHERE DATE(fecha_ingreso) = CURDATE();`;
        const result=await consultasGenerales(query);
        return result[0];

    }
    async estadisticaAreaPsiquica(){

        const query = `
            select 
                sum(control_equipo_salud_mental = 1) as tcesm,
                sum(psicoterapia = 1) as ts, 
                sum(evaluacion_psiquica = 1) as tes,
                sum(diagnostico_psiquiatrico = 1) as tdps,
                sum(utilizacion_farmaco = 1) as  tuf
            from areas_psiquicas;
        `;
     

        try{
            
            const dataAreaPsiquica = await consultasGenerales(query);
            return dataAreaPsiquica;

        }catch(err:any){
            throw new Error(err);
        }
    }



} 