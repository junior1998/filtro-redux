import * as fromTodo from './todo.actions';
import {Todo} from './model/todo.model';

const todo1 = new Todo('Vencer a thanos');
const todo2 = new Todo('Salvar el mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1,todo2,todo3];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones):Todo[]{
    switch(action.type){
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state,todo];
        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit =>{
                if(todoEdit.id === action.id){
                    return {
                        ... todoEdit,
                        completado: !todoEdit.completado
                    }
                }else{
                    return todoEdit;
                }
            })

        case fromTodo.EDITAR_TODO:
            return state.map(TodoEdita =>{
                if(TodoEdita.id === action.id){
                    return{
                        ... TodoEdita,
                        texto: action.texto
                    }
                }else{
                    return TodoEdita;
                }
            })

        case fromTodo.BORRAR_TODO:
            return state.filter(editar => editar.id != action.id);
            
        case fromTodo.TOGGLE_ALL_TODO:
            console.log('entro en el ALL')
            return state.map(toggleALL => {
                return {
                    ... toggleALL,
                    completado: action.completado
                }
            })

        case fromTodo.BORRAR_COMPLETADOS:
            return state.filter(BorrarComple => !BorrarComple.completado)

        default:
            return state;
    }
}    