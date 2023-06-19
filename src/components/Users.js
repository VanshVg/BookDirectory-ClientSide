import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import "../style/users.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/actions/userActions";

export const Users = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserData([]));
    axios
      .get("https://book-directory-api-tkvh.onrender.com/api/displayUsers")
      .then((resp) => {
        dispatch(setUserData(resp.data.data));
      })
      .catch((err) => [console.log(err)]);
  }, [dispatch]);

  console.log(userData);

  return (
    <>
      <Navbar />
      <h1 align="center">Users</h1>
      <table class="table table-hover table-light">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        {userData.map((user, index) => (
          <>
            <tbody>
              <tr>
                <th scope="row">{index}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
    </>
  );
};
