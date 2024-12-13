package com.example.todoapp_backend.service;

import com.example.todoapp_backend.model.ToDo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class ToDoServiceTest {

    private ToDoService toDoService;

    @BeforeEach
    void setUp() {
        toDoService = new ToDoService();
    }

    @Test
    void testGetTodos() {
        ToDo todo1 = new ToDo();
        todo1.setId(1L);
        todo1.setName("Test ToDo 1");
        todo1.setPriority("High");
        todo1.setDoneFlag(false);

        ToDo todo2 = new ToDo();
        todo2.setId(2L);
        todo2.setName("Test ToDo 2");
        todo2.setPriority("Low");
        todo2.setDoneFlag(true);

        toDoService.postToDo(todo1);
        toDoService.postToDo(todo2);

        ArrayList<ToDo> todos = toDoService.getTodos(Optional.empty(), "", "All", "All", "no", "no");
        assertEquals(2, todos.size());
    }

    @Test
    void testPostToDo() {
        ToDo todo = new ToDo();
        todo.setId(1L);
        todo.setName("Test ToDo");
        todo.setPriority("High");
        todo.setDoneFlag(false);

        String response = toDoService.postToDo(todo);
        assertEquals("ToDo successfully posted", response);
    }

    @Test
    void testPostToDoDone() {
        ToDo todo = new ToDo();
        todo.setId(1L);
        todo.setName("Test ToDo");
        todo.setPriority("High");
        todo.setDoneFlag(false);

        toDoService.postToDo(todo);
        todo.setDoneFlag(true);

        String response = toDoService.postToDoDone(1L, todo);
        assertEquals("Successfully marked ToDo as done", response);
    }

    @Test
    void testUpdateToDo() {
        ToDo todo = new ToDo();
        todo.setId(1L);
        todo.setName("Test ToDo");
        todo.setPriority("High");
        todo.setDoneFlag(false);

        toDoService.postToDo(todo);
        todo.setName("Updated ToDo");

        String response = toDoService.updateToDo(1L, todo);
        assertEquals("Successfully updated item", response);
    }

    @Test
    void testPutToDoUndone() {
        ToDo todo = new ToDo();
        todo.setId(1L);
        todo.setName("Test ToDo");
        todo.setPriority("High");
        todo.setDoneFlag(true);

        toDoService.postToDo(todo);
        todo.setDoneFlag(false);

        String response = toDoService.putToDoUndone(1L, todo);
        assertEquals("Successfully marked ToDo as undone", response);
    }

    @Test
    void testDeleteToDo() {
        ToDo todo = new ToDo();
        todo.setId(1L);
        todo.setName("Test ToDo");
        todo.setPriority("High");
        todo.setDoneFlag(false);

        toDoService.postToDo(todo);

        String response = toDoService.deleteToDo(1L);
        assertEquals("todo deleted successfully", response);
    }
}