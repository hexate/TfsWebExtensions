TfsWebExtensions
================

Useful web extensions for TFS. The web access for TFS is great, but it's missing a few things.

WARNING: Caveats with using this:

* Tfs Web Access Extensions are officially undocumented, so this might not always work.
* Certain nodes and attributes in the XML of the manifest file appear to be case sensitive, so don't get creative.


Task Board Extensions
---------------------
The task board extensions add additional functionality to task board. After the task board loads, it queries TFS for work item information, then updates the view, which takes a moment to complete (asynchronously). Currently it does the following:

* Changes the color of 'Bug' work items to green.

... and that's it! for now.
