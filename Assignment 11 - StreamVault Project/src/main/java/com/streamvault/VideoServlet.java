package com.streamvault;

import com.streamvault.util.DBConnection;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/VideoServlet")
public class VideoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Connection conn = DBConnection.getConnection();
        
        try {
            String query = "SELECT * FROM videos";
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            
            // Note: In a real app, use a JSON library like Jackson or GSON
            out.print("[");
            boolean first = true;
            while (rs.next()) {
                if (!first) out.print(",");
                out.print("{\"id\":" + rs.getInt("id") + 
                          ",\"title\":\"" + rs.getString("title") + "\"" +
                          ",\"genre\":\"" + rs.getString("genre") + "\"" +
                          ",\"views\":" + rs.getInt("views") + "}");
                first = false;
            }
            out.print("]");
        } catch (SQLException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"Database error: " + e.getMessage() + "\"}");
        } finally {
            DBConnection.closeConnection(conn);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String title = request.getParameter("title");
        String genre = request.getParameter("genre");
        
        Connection conn = DBConnection.getConnection();
        try {
            String query = "INSERT INTO videos (title, genre, views) VALUES (?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, title);
            ps.setString(2, genre);
            ps.setInt(3, 0);
            
            int result = ps.executeUpdate();
            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().print("{\"message\":\"Video added successfully\"}");
            }
        } catch (SQLException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print("{\"error\":\"Database error: " + e.getMessage() + "\"}");
        } finally {
            DBConnection.closeConnection(conn);
        }
    }
}
