import { useReducer, useRef } from "react";


const ListaTareas = () => {
    const inputRef = useRef();

    const [tasks, dispatch] = useReducer((state = [], action) => {
        switch (action.type) {
            case 'add_task': {
                return [
                    ...state,
                    { id: state.length, title: action.title }
                ];
            }
            case 'remove_task': {
                return state.filter((task, index) => index !== action.index);
            }
            default: {
                return state;
            }
        }
    }, []); // Añadido [] como valor inicial para evitar problemas al usar state.length

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'add_task',
            title: inputRef.current.value
        });
        inputRef.current.value = ""; // Limpiar el campo de entrada después de agregar la tarea
    };

    return (
        <div>
            <header>
                <h1>TO-DO LIST</h1>
            </header>
            <main>
                <section className="agregar-tarea">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nueva tarea" ref={inputRef} />
                        <button type="submit">Agregar</button>
                    </form>
                </section>
                <section className="lista-tareas">
                    <h2>Tus tareas</h2>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <label htmlFor={`tarea${task.id + 1}`}>{task.title}</label>
                                <button onClick={() => dispatch({ type: 'remove_task', index })}>
                                    Borrar
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default ListaTareas;
