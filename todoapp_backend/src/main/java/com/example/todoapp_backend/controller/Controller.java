package com.example.todoapp_backend.controller;
import com.example.todoapp_backend.model.ToDo;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/todos")
@CrossOrigin("http://localhost:8080")

public class Controller {
    ArrayList<ToDo> todos = new ArrayList<ToDo>();

    // get Todos
    @GetMapping
    public ArrayList<ToDo> getTodo(@RequestParam("page") Optional<Integer> page, @RequestParam("searchName") String searchName, @RequestParam("searchPriority") String searchPriority, @RequestParam("searchState") String searchState, @RequestParam("sortPriority") String sortPriority, @RequestParam("sortDate") String sortDate){ //I need to add the parameters for search next!
        ArrayList<ToDo> filteredTodos = new ArrayList<ToDo>();
        ArrayList<ToDo> pagedTodos = new ArrayList<ToDo>();

        for(ToDo entry : todos){
            if(entry.getName().toUpperCase().contains(searchName.toUpperCase())
                    && (Objects.equals(searchPriority,"All")? true : Objects.equals(entry.getPriority(),searchPriority))
                        && (Objects.equals(searchState,"All")? true : entry.getDoneFlag() == ((Objects.equals(searchState, "true"))? true : false))){
                filteredTodos.add(entry);
            }
        }

        // Filter by priority
       Comparator<ToDo> priorityComparator = new Comparator<ToDo>() {
            @Override
            public int compare(ToDo t1, ToDo t2){
                return getOrder(t1) - getOrder(t2);
            }

            private int getOrder(ToDo t) {
                switch (t.getPriority()){
                    case "High":
                        return 1;

                    case "Medium":
                        return 2;

                    case "Low":
                        return 3;

                    default:
                        return Integer.MAX_VALUE;
                }
            }
        };

        Comparator<ToDo> dateComparator = new Comparator<ToDo>() {
            @Override
            public int compare(ToDo t1, ToDo t2) {
                return t1.getDueDate().compareTo(t2.getDueDate());
            }
        };

        Comparator<ToDo> sortBoth = priorityComparator.thenComparing(dateComparator);

        if(sortPriority.equals("no") && sortDate.equals("no")) {
        } else if (sortPriority.equals("ascending") && sortDate.equals("ascending")) {
            filteredTodos.sort(sortBoth);
        } else if (sortPriority.equals("ascending") && sortDate.equals("descending")) {
            filteredTodos.sort(priorityComparator.thenComparing(dateComparator.reversed()));
        } else if (sortPriority.equals("no") && sortDate.equals("ascending")) {
            filteredTodos.sort(dateComparator);
        } else if (sortPriority.equals("no") && sortDate.equals("descending")) {
            filteredTodos.sort(dateComparator.reversed());
        } else if (sortPriority.equals("ascending") && sortDate.equals("no")) {
            filteredTodos.sort(priorityComparator);
        } else if (sortPriority.equals("descending") && sortDate.equals("no")){
            filteredTodos.sort(priorityComparator.reversed());
        } else if (sortPriority.equals("descending") && sortDate.equals("ascending")){
            filteredTodos.sort(priorityComparator.reversed().thenComparing(dateComparator));
        } else if (sortPriority.equals("descending") && sortDate.equals("descending")){
            filteredTodos.sort(sortBoth.reversed());
        }

        // Pagination
        if (page.isPresent()){
            int size = filteredTodos.size();
            int index = (page.get()-1) * 10;
            int lastIndex = Math.min(index + 10, size);
            System.out.println(lastIndex);
            for(int i = index ; index < lastIndex ; index++){
                pagedTodos.add(filteredTodos.get(index));
            }
            return pagedTodos;
        }
        return filteredTodos;
    }

    @PostMapping
    public String postToDo(@RequestBody ToDo todo) {
        boolean repeatFlag = false;
        for(ToDo entry: todos){
            if(todo.getId() == entry.getId()){
                repeatFlag = true;
                break;
            }
        }
        if(repeatFlag){
            return "ID has been repeated, could not add new todo";
        } else {
            todos.add(todo);
            return "ToDo successfully posted";
        }
    }

    // HANDLE CHECK DONE
    @PostMapping("{id}/done")
    public String postToDoDone(@PathVariable("id") long id, @RequestBody ToDo todo){
        for(ToDo entry: todos){
            if(id == entry.getId()){
                int index = todos.indexOf(entry);
                todos.set(index,todo);
                return "Successfully marked ToDo as done";
            }
        }
        return "ToDo could not be marked as done";
    }

    @PutMapping("{id}")
    public String updateToDo(@PathVariable("id") long id, @RequestBody ToDo todo){
        for (ToDo entry: todos){
            if(id == entry.getId()){
                int index = todos.indexOf(entry);
                todos.set(index,todo);
                return "Successfully updated item";
            }
        }
        return "Could not find ToDo with requested id";
    }

    // HANDLE CHECK UNDONE
    @PutMapping("{id}/undone")
    public String putToDoUndone(@PathVariable("id") long id, @RequestBody ToDo todo){
        for(ToDo entry: todos){
            if(id == entry.getId()){
                int index = todos.indexOf(entry);
                todos.set(index,todo);
                return "Successfully marked ToDo as undone";
            }
        }
        return "Could not mark ToDo as undone";
    }

    @DeleteMapping("{id}")
    public String deleteToDo(@PathVariable("id") Long id){
        Integer index = 0;
        for(ToDo entry : todos){
            if(Objects.equals(id, entry.getId())) {
                todos.remove(entry);
                return "todo deleted successfully";
            }
        }
        return "Could not find ToDo with requested id";
    }
}
