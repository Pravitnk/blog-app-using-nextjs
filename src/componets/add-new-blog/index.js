import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const AddNewBlog = ({
  openBlogDialog,
  setOpenBlogDialog,
  blogData,
  setBlogData,
  handleSaveBlogData,
  loading,
  currentEditBlogId,
  setCurrentEditBlogId,
}) => {
  return (
    <div>
      {/* add new blog */}
      <div className="m-10">
        <Button
          className="cursor-pointer"
          onClick={() => setOpenBlogDialog(true)}
        >
          Add New Blog
        </Button>
      </div>
      <div>
        <Dialog
          open={openBlogDialog}
          onOpenChange={() => {
            setBlogData({ title: "", description: "" });
            setOpenBlogDialog(false);
            setCurrentEditBlogId(null);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {currentEditBlogId ? "Edit Blog" : "Add New Blog"}
              </DialogTitle>
              <DialogDescription>
                Add your blogs and share it with the world...!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  name="title"
                  id="title"
                  placeholder="Enter Blog Title"
                  value={blogData.title}
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      title: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Input
                  name="description"
                  id="description"
                  placeholder="Enter Blog Description"
                  value={blogData.description}
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveBlogData}
                className="cursor-pointer"
              >
                {loading ? "saving changes" : "save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNewBlog;
