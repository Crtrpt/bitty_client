export default confirm= {
    created(el, binding, vnode, prevVnode) {

        el.addEventListener("click",(e)=>{
            e.stopPropagation();
            console.log("删除=======");
        })
    },
    mounted(el, binding, vnode) {
        const vm = binding.instance    
    }
}