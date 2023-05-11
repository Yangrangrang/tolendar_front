export default function Todo (){
  return (
    <div className="do-card flex justify-between pt-2">
      <div>
        <input type="checkbox" className="mr-2 accent-orange-500"/>
        <span>todo title</span>
      </div>
      <span>완료 예정일</span>
    </div>
  )
}