import { Group } from "../models/group";
import { User } from "../models/user";
import { fetchData } from "./fetchData";

export async function fetchGroups(token: string): Promise<Group[]> {
    const response = await fetchData(`http://localhost:5001/api/groups`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

export async function fetchGroup(groupId: string, token: string): Promise<Group> {
    const response = await fetchData(`http://localhost:5001/api/groups/` + groupId, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

export async function createGroup(name: string, token: string): Promise<Group> {
    const response = await fetchData(`http://localhost:5001/api/groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    });
    return response.json();
}
//TODO inactive rn
export async function updateGroup(groupId: string, token: string): Promise<Group> {
    const response = await fetchData(`http://localhost:5001/api/groups/` + groupId, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

export async function deleteGroup(groupId: string, token: string) {
    await fetchData(`http://localhost:5001/api/groups/` + groupId, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
}

export async function addUserToGroup(groupId: string, token: string): Promise<User> {
    const response = await fetchData(`http://localhost:5001/api/groups/addUser/` + groupId, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

export async function removeUserFromGroup(groupId: string, token: string): Promise<User> {
    const response = await fetchData(`http://localhost:5001/api/groups/remUser/` + groupId, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

export async function addCategoryToGroup(category: string, groupId: string, token: string): Promise<Group> {
    const response = await fetchData(`http://localhost:5001/api/groups/addCat/` + groupId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ category: category }),
    });
    return response.json();
}

export async function removeCategoryFromGroup(category: string, groupId: string, token: string): Promise<Group> {
    const response = await fetchData(`http://localhost:5001/api/groups/remCat/` + groupId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ category: category }),
    });
    return response.json();
}