<template>
  <div class="dynamicTable">
    <h1>{{message}}</h1>

    <span class="left">Show 
      <select v-model="rowsPerPage">
        <option v-for="count in rowsCounters">{{count}}</option>
      </select> entities
    </span>
    <input type="search" placeholder="Search ..." class="form-control right" v-model="searchText" />
    <table class="dynamicGrid">
      <tr>
        <th v-for="column in dataSource.columns" @click="sortBy(column)">
          <span>{{column}}</span>
          <span class='right'>{{sortSign(column)}}</span>
        </th>
      </tr>
      <tr v-for="row in currentList">
        <td v-for="item in row">{{item}}</td>
      </tr>
    </table>
    <div class="pagination">
      <div class="left">
        Showing {{beginRow+1}} to {{endRow}} from {{allSelectedRows.length}} entities
      </div>
      <div class="btn-group right">
        <button v-if="hasPrevPage()" @click="changePage(prevPage)">Previous</button>
        <button v-if="hasFirst()" @click="changePage(1)">1</button>
        <button v-for="page in pages" :class="{current: currentPage == page}" @click="changePage(page)">{{page}}</button>
        <button v-if="hasLast()" @click="changePage(totalPages)">{{totalPages}}</button>
        <button v-if="hasNextPage()" @click="changePage(nextPage)">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import dataJson from './data.json'
export default {
    name: 'app',
    data () {
      return {
        message: 'Dynamic table',
        rowsCounters: [5, 10, 15],
        sortKey: '',        
        reverse: false,
        dataSource: 
        {
          columns: Object.keys(dataJson[0]),
          rows: dataJson
        },
        selectedRows: [],
        allSelectedRows: [],
        rowsPerPage: 10,
        currentPage: 1,
        searchText: ''
      }
    },

    watch:
    {
      searchText(text)
      {
        this.currentPage = 1;
      }
    },

    methods:
    {
      isDate(date)
      {
        date = date.toString().replace(/\./g, '/');
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
      },

      parseDate(date)
      {
        date = date.replace(/\./g, '/');
        return new Date(date);
      },

      isColumnDate(column)
      {
        let list = this.dataSource.rows.map((row) => row[column]);
        for(let i = 0; i < list.length; i++)
        {
          if(this.isDate(list[i]) == false) return false;
        }
        return true;
      },

      sortBy(sortKey) 
      {
        this.reverse = (this.sortKey == sortKey) ? !this.reverse : false;
        this.sortKey = sortKey;
      },

      sortSign(column)
      {
        if(column != this.sortKey) return '↑↓';
        return this.reverse ? '↓' : '↑';
      },

      changePage(page)
      {
        this.currentPage = page;
      },

      hasPrevPage()
      {
        return this.currentPage > 1;
      },

      hasNextPage()
      {
        return this.currentPage < this.totalPages; 
      },

      hasFirst()
      {
        return this.beginRange != 1;
      },

      hasLast()
      {
        return this.endRange < this.totalPages;
      }
    },

    computed: 
    {
      filteredList() 
      {
        let text = this.searchText;
        return this.dataSource.rows.map(function(row, index)
        {
          // row.index = index;
          return row;
        }).filter(function(cells)
        {
          if (text == "") 
          {
            return true;
          } else 
          {
            for(let column in cells)
            {
              if(cells[column].toString().toLowerCase().indexOf(text.toLowerCase()) > -1)
                return true;
            }
            return false;            
          }
        });
      },

      sortedList() 
      {
        if(this.sortKey == '') return this.filteredList;
        return this.filteredList.sort((a,b) => 
        {
          let modifier = 1;
          if(this.reverse == true) modifier = -1;
          let first, second;
          if(this.isColumnDate(this.sortKey) == true)
          {
            first = this.parseDate(a[this.sortKey]);
            second = this.parseDate(b[this.sortKey]);
          }
          else
          {
            first = a[this.sortKey];
            second = b[this.sortKey];
          }          
          if(first < second) return -1 * modifier;
          if(first > second) return 1 * modifier;
          return 0;
        });
      },

      beginRow()
      {
        if(this.sortedList.length == 0) return -1;
        return (this.currentPage - 1) * this.rowsPerPage;
      },

      endRow()
      {
        let end = this.currentPage * this.rowsPerPage;
        let list = this.sortedList; 
        return end >= list.length ? list.length : end;
      },

      currentList()
      {
        this.allSelectedRows = this.sortedList;        
        this.selectedRows = this.allSelectedRows.slice(this.beginRow, this.endRow);
        return this.selectedRows;
      },

      prevPage()
      {
        return this.currentPage - 1;
      },

      nextPage()
      {
        return this.currentPage + 1;
      },

      totalPages()
      {
        return Math.ceil(this.allSelectedRows.length / this.rowsPerPage);
      },

      beginRange()
      {
        let begin = this.currentPage - 2;
        return begin > 0 ? begin : 1;
      },

      endRange()
      {
        let end = this.currentPage + 2;
        return end < this.totalPages ? end : this.totalPages;
      },

      pages()
      {
        let pages = [];   
        for(let i = this.beginRange; i <= this.endRange; i++)
          pages.push(i);
        return pages;
      }
    }
}
</script>

<style lang='less'>
.dynamicTable
{
  position: absolute;
  width: 70%;

  select
  {
    width: 50px;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .left
  {
    position: relative;
    left: 5px;
  }

  .right
  {
    position: absolute;
    right: 0px;
    margin-right: 5px; 
  }

  .dynamicGrid
  {
    width: 100%;
    border: 1;
    border-style: solid;
    th, td
    {
      position: relative;
      border: 1;
      border-style: solid;
      border-color: lightgray;
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
      min-width: 50px;
    }

    th:hover 
    {
      background: lightgray;
    }

    th:active 
    {
      background: gray;
    }
  }

  .pagination
  {
    position: relative;

  }

  .btn-group button 
  {
    background-color: transparent;
    border: 1px solid #ccc;
    color: black;
    padding: 10px 24px;
    cursor: pointer;
    float: left;
  }

  .btn-group
  {
    button:not(:last-child) 
    {
      border-right: none;
    }

    button:hover 
    {
      background-color: lightgray;
    }

    button:active
    {
      background-color: gray;
    }

    button.current
    {
      background-color: gray;
      color: orange;
    }
  }

  .btn-group:after 
  {
    content: "";
    clear: both;
    display: table;
  }
}
</style>
