package com.example.todoapp_backend.controller;

import com.example.todoapp_backend.model.ToDo;
import com.example.todoapp_backend.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
@CrossOrigin("http://localhost:8080")
public class Controller {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public ArrayList<ToDo> getTodo(@RequestParam("page") Optional<Integer> page, @RequestParam("searchName") String searchName, @RequestParam("searchPriority") String searchPriority, @RequestParam("searchState") String searchState, @RequestParam("sortPriority") String sortPriority, @RequestParam("sortDate") String sortDate) {
        return toDoService.getTodos(page, searchName, searchPriority, searchState, sortPriority, sortDate);
    }

    @PostMapping
    public String postToDo(@RequestBody ToDo todo) {
        return toDoService.postToDo(todo);
    }

    @PostMapping("{id}/done")
    public String postToDoDone(@PathVariable("id") long id, @RequestBody ToDo todo) {
        return toDoService.postToDoDone(id, todo);
    }

    @PutMapping("{id}")
    public String updateToDo(@PathVariable("id") long id, @RequestBody ToDo todo) {
        return toDoService.updateToDo(id, todo);
    }

    @PutMapping("{id}/undone")
    public String putToDoUndone(@PathVariable("id") long id, @RequestBody ToDo todo) {
        return toDoService.putToDoUndone(id, todo);
    }

    @DeleteMapping("{id}")
    public String deleteToDo(@PathVariable("id") Long id) {
        return toDoService.deleteToDo(id);
    }
}