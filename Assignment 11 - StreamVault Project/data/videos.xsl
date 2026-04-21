<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
  <head>
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background: #07080F;
        color: #F0F2FF;
        padding: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        background: #0E1019;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.07);
      }
      th {
        background: #151720;
        color: #7A7F9A;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      td {
        padding: 15px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        font-size: 0.85rem;
      }
      tr:hover {
        background: rgba(255,255,255,0.02);
      }
      .badge {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: capitalize;
      }
      .active { background: rgba(0,201,167,0.15); color: #00C9A7; }
      .rating { color: #FFB830; }
      h2 {
        font-family: 'Syne', sans-serif;
        color: #E5383B;
      }
    </style>
  </head>
  <body>
    <h2>Legacy Video Repository (XML Data)</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Genre</th>
        <th>Type</th>
        <th>Duration</th>
        <th>Views</th>
        <th>Rating</th>
        <th>Status</th>
      </tr>
      <xsl:for-each select="video_library/video">
      <tr>
        <td><xsl:value-of select="@id"/></td>
        <td style="font-weight:600;"><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="genre"/></td>
        <td style="text-transform:capitalize;"><xsl:value-of select="@type"/></td>
        <td><xsl:value-of select="duration"/></td>
        <td><xsl:value-of select="views"/></td>
        <td class="rating">★ <xsl:value-of select="rating"/></td>
        <td>
          <span class="badge active">
            <xsl:value-of select="status"/>
          </span>
        </td>
      </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
