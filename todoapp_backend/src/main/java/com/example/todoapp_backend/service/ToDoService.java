package com.example.todoapp_backend.service;

import com.example.todoapp_backend.model.ToDo;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ToDoService {
    private final ArrayList<ToDo> todos = new ArrayList<>();

    public ArrayList<ToDo> getTodos(Optional<Integer> page, String searchName, String searchPriority, String searchState, String sortPriority, String sortDate) {
        ArrayList<ToDo> filteredTodos = new ArrayList<>();
        ArrayList<ToDo> pagedTodos = new ArrayList<>();

        for (ToDo entry : todos) {
            if (entry.getName().toUpperCase().contains(searchName.toUpperCase())
                    && (Objects.equals(searchPriority, "All") || Objects.equals(entry.getPriority(), searchPriority))
                    && (Objects.equals(searchState, "All") || entry.getDoneFlag() == Boolean.parseBoolean(searchState))) {
                filteredTodos.add(entry);
            }
        }

        Comparator<ToDo> priorityComparator = Comparator.comparingInt(this::getOrder);
        Comparator<ToDo> dateComparator = Comparator.comparing(ToDo::getDueDate);
        Comparator<ToDo> sortBoth = priorityComparator.thenComparing(dateComparator);

        if (!sortPriority.equals("no") || !sortDate.equals("no")) {
            if (sortPriority.equals("ascending") && sortDate.equals("ascending")) {
                filteredTodos.sort(sortBoth);
            } else if (sortPriority.equals("ascending") && sortDate.equals("descending")) {
                filteredTodos.sort(priorityComparator.thenComparing(dateComparator.reversed()));
            } else if (sortPriority.equals("no") && sortDate.equals("ascending")) {
                filteredTodos.sort(dateComparator);
            } else if (sortPriority.equals("no") && sortDate.equals("descending")) {
                filteredTodos.sort(dateComparator.reversed());
            } else if (sortPriority.equals("ascending") && sortDate.equals("no")) {
                filteredTodos.sort(priorityComparator);
            } else if (sortPriority.equals("descending") && sortDate.equals("no")) {
                filteredTodos.sort(priorityComparator.reversed());
            } else if (sortPriority.equals("descending") && sortDate.equals("ascending")) {
                filteredTodos.sort(priorityComparator.reversed().thenComparing(dateComparator));
            } else if (sortPriority.equals("descending") && sortDate.equals("descending")) {
                filteredTodos.sort(sortBoth.reversed());
            }
        }

        if (page.isPresent()) {
            int size = filteredTodos.size();
            int index = (page.get() - 1) * 10;
            int lastIndex = Math.min(index + 10, size);
            for (int i = index; i < lastIndex; i++) {
                pagedTodos.add(filteredTodos.get(i));
            }
            return pagedTodos;
        }
        return filteredTodos;
    }

    public String postToDo(ToDo todo) {
        for (ToDo entry : todos) {
            if (todo.getId() == entry.getId()) {
                return "ID has been repeated, could not add new todo";
            }
        }
        todos.add(todo);
        return "ToDo successfully posted";
    }

    public String postToDoDone(long id, ToDo todo) {
        for (ToDo entry : todos) {
            if (id == entry.getId()) {
                int index = todos.indexOf(entry);
                todos.set(index, todo);
                return "Successfully marked ToDo as done";
            }
        }
        return "ToDo could not be marked as done";
    }

    public String updateToDo(long id, ToDo todo) {
        for (ToDo entry : todos) {
            if (id == entry.getId()) {
                int index = todos.indexOf(entry);
                todos.set(index, todo);
                return "Successfully updated item";
            }
        }
        return "Could not find ToDo with requested id";
    }

    public String putToDoUndone(long id, ToDo todo) {
        for (ToDo entry : todos) {
            if (id == entry.getId()) {
                int index = todos.indexOf(entry);
                todos.set(index, todo);
                return "Successfully marked ToDo as undone";
            }
        }
        return "Could not mark ToDo as undone";
    }

    public String deleteToDo(Long id) {
        for (ToDo entry : todos) {
            if (Objects.equals(id, entry.getId())) {
                todos.remove(entry);
                return "todo deleted successfully";
            }
        }
        return "Could not find ToDo with requested id";
    }

    private int getOrder(ToDo t) {
        switch (t.getPriority()) {
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
}