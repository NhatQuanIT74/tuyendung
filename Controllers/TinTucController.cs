using System;
using System.Web.Mvc;
using TuyenDungCNTT.Models.Dao;
using TuyenDungCNTT.Models.ViewModels.BaiViet;
using TuyenDungCNTT.Models.ViewModels.Common;

namespace TuyenDungCNTT.Controllers
{
    public class TinTucController : Controller
    {
        private readonly BaiVietDao dao;

        public TinTucController()
        {
            dao = new BaiVietDao();
        }
        // GET: TinTuc
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPaging(string KeyWord, int pageIndex)
        {
            var paging = new GetListPaging()
            {
                keyWord = string.Empty,
                PageIndex = pageIndex,
                PageSize = 5
            };
            var data = dao.GetList(paging);
            int totalRecord = data.TotalRecord;
            int toalPage = (int)Math.Ceiling((double)totalRecord / paging.PageSize);
            return Json(new { data = data.Items, pageCurrent = pageIndex, toalPage = toalPage, totalRecord = totalRecord }
                , JsonRequestBehavior.AllowGet);
        }

    }
}