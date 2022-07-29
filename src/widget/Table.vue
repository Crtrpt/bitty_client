<template>
    <div>
            <table class="table-auto border p-2  ">
            <thead class="  bg-gray-50">
                <tr>
                    <th class=" py-2 px-2  w-5" v-if="options.selectable">
                        <input type="checkbox" @change="toggleSelect()" v-model="selectAll"/>
                    </th>
                    <th class="  cursor-pointer overflow-hidden hover:bg-blue-100 py-2 px-2  overflow-hidden "  v-for="f in options.fields" :key="f"  
                    :style="f.style" :class="f.class"
                    >
                        <div class=" flex   items-center "  @click="setSort(f)">
                            <span class="whitespace-nowrap flex-grow text-gray-500"  > {{f.display||f.name}}</span>
                            <template v-if="f.sortable"  >
                                <font-awesome-icon class="h-3  ml-2 text-red-600" icon="arrow-up-long"   v-if="f.sort=='asc'"  />
                                <font-awesome-icon class="h-3 ml-2 text-red-600" icon="arrow-down-long" v-if="f.sort=='desc'"  />
                                <font-awesome-icon class=" h-3 ml-2 text-gray-400" icon="arrows-up-down"  v-if="!f.sort"  />
                            </template>
                        </div>                    
                    </th>
                </tr>
            </thead>
            <tbody class="content ">
                <tr class="row  hover:bg-blue-100 "  @click="selectItem(i)" v-for="i in options.data" :key="i.id" >
                    <td class=" py-2 px-2  w-5" v-if="options.selectable" >
                        <input type="checkbox" v-model="i._selected" />
                    </td>
                    <td class="col px-2 "  v-for="f in options.fields" :key="f" :style="f.style1" :class="f.class1" >
                        <slot :name="f.name" :data="i">
                         {{i[f.name]}}
                        </slot>
                    </td>
                </tr>
            </tbody>
    </table>
     <div class="flex py-2 w-full">
                   <div class=" flex-grow">
                     共{{options.total}}条记录
                   </div>
                    <div class="flex">
                        <a>上一页</a>
                       
                        <input v-model="options.query.size" class=" w-10  text-center mx-5"/>
                        <a>下一页</a>
                    </div>
                </div>
    </div>
</template>


<script lang="ts">
export default {
  name: "Table",
  props: {
    options:Object,
  },
  data(){
    return {
        selectAll:false
    }
  },
  methods:{
    toggleSelect(){
        console.log("变更")
        this.options.data.forEach(element => {
            element._selected=this.selectAll;
        });
    },
    selectItem(i){
        i._selected=!i._selected
    },
    setSort(f){
         console.log(f.sort);
        switch (f.sort){
            case undefined :
                 f.sort="desc"
                 break
            case "desc":
                f.sort="asc";
                break;
            case "asc":
                f.sort=undefined;
                break
        }
        console.log(f.sort);
       
    }
  }
};
</script>
